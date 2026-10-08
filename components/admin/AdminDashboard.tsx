'use client';

import { App, Button, Card, DatePicker, Descriptions, Drawer, Input, Popconfirm, Rate, Select, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { STATUS_META, formatDate, type AdminEvaluation, type Status } from './types';

interface Filters {
  q?: string;
  category?: string;
  rating?: number;
  status?: Status;
  hidden: 'visible' | 'hidden' | 'all';
  from?: string;
  to?: string;
}

const PAGE_SIZE = 20;
const errMsg = (e: unknown, fallback: string) =>
  (axios.isAxiosError(e) && e.response?.data?.message) || fallback;

export default function AdminDashboard() {
  const { message } = App.useApp();
  const [filters, setFilters] = useState<Filters>({ hidden: 'visible' });
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<AdminEvaluation[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AdminEvaluation | null>(null);
  const [status, setStatus] = useState<Status>('baru');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  const catLabel = useCallback((id: string) => labels[id] ?? id, [labels]);

  const handleAuth = useCallback((e: unknown) => {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      window.location.href = '/admin/login';
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    axios
      .get('/api/v1/evaluations/categories')
      .then((r) => setLabels(Object.fromEntries(r.data.data.map((c: { id: string; label: string }) => [c.id, c.label]))))
      .catch(() => undefined);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters, page, pageSize: PAGE_SIZE };
      const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''));
      const { data } = await axios.get('/api/v1/admin/evaluations', { params: clean });
      setItems(data.data.items);
      setTotal(data.data.total);
      setCategories(data.data.categories);
    } catch (e) {
      if (!handleAuth(e)) message.error(errMsg(e, 'Gagal memuat data.'));
    } finally {
      setLoading(false);
    }
  }, [filters, page, handleAuth, message]);

  useEffect(() => {
    load();
  }, [load]);

  const open = (row: AdminEvaluation) => {
    setSelected(row);
    setStatus(row.status);
    setNote(row.internal_note ?? '');
  };

  const mutate = async (fn: () => Promise<AdminEvaluation | null>, ok: string) => {
    setBusy(true);
    try {
      const updated = await fn();
      message.success(ok);
      setSelected(updated);
      await load();
    } catch (e) {
      if (!handleAuth(e)) message.error(errMsg(e, 'Gagal menyimpan perubahan.'));
    } finally {
      setBusy(false);
    }
  };

  const patch = (body: object, ok: string) =>
    selected && mutate(async () => (await axios.patch(`/api/v1/admin/evaluations/${selected.id}`, body)).data.data, ok);

  const remove = () =>
    selected && mutate(async () => (await axios.delete(`/api/v1/admin/evaluations/${selected.id}`), null), 'Evaluasi dihapus permanen.');

  const setFilter = (patchF: Partial<Filters>) => {
    setPage(1);
    setFilters((f) => ({ ...f, ...patchF }));
  };

  const columns: ColumnsType<AdminEvaluation> = useMemo(
    () => [
      { title: 'Tanggal', dataIndex: 'created_at', width: 170, render: formatDate },
      { title: 'Kategori', dataIndex: 'category', width: 170, render: (c: string) => <Tag>{catLabel(c)}</Tag> },
      { title: 'Rating', dataIndex: 'rating', width: 150, render: (r: number) => <Rate disabled value={r} /> },
      {
        title: 'Pengirim',
        width: 150,
        render: (_, r) => (r.is_anonymous ? <Tag>Anonim</Tag> : <span>{r.reporter_name}</span>),
      },
      {
        title: 'Ringkasan',
        render: (_, r) => (
          <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 2 }}>
            {r.improvements_needed || r.positive_feedback || <em style={{ color: '#999' }}>(tanpa teks)</em>}
          </Typography.Paragraph>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 150,
        render: (s: Status, r) => (
          <Space size={4} wrap>
            <Tag color={STATUS_META[s].color}>{STATUS_META[s].label}</Tag>
            {r.hidden_at && <Tag color="default">Disembunyikan</Tag>}
          </Space>
        ),
      },
      { title: '', width: 90, render: (_, r) => <Button size="small" onClick={() => open(r)}>Kelola</Button> },
    ],
    [catLabel],
  );

  const dirty = selected && (status !== selected.status || note.trim() !== (selected.internal_note ?? ''));

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: 24 }}>
      <Card styles={{ body: { padding: 16 } }}>
        <Space wrap size={12} style={{ marginBottom: 16 }}>
          <Input.Search
            allowClear
            placeholder="Cari teks atau nama…"
            style={{ width: 240 }}
            maxLength={100}
            onSearch={(v) => setFilter({ q: v.trim() || undefined })}
          />
          <Select
            allowClear
            placeholder="Kategori"
            style={{ width: 200 }}
            value={filters.category}
            options={categories.map((c) => ({ value: c, label: catLabel(c) }))}
            onChange={(v) => setFilter({ category: v })}
          />
          <Select
            allowClear
            placeholder="Rating"
            style={{ width: 110 }}
            value={filters.rating}
            options={[5, 4, 3, 2, 1].map((n) => ({ value: n, label: `${n} ★` }))}
            onChange={(v) => setFilter({ rating: v })}
          />
          <Select
            allowClear
            placeholder="Status"
            style={{ width: 160 }}
            value={filters.status}
            options={(Object.keys(STATUS_META) as Status[]).map((s) => ({ value: s, label: STATUS_META[s].label }))}
            onChange={(v) => setFilter({ status: v })}
          />
          <Select
            style={{ width: 170 }}
            value={filters.hidden}
            options={[
              { value: 'visible', label: 'Tidak disembunyikan' },
              { value: 'hidden', label: 'Disembunyikan' },
              { value: 'all', label: 'Semua' },
            ]}
            onChange={(v) => setFilter({ hidden: v })}
          />
          <DatePicker.RangePicker onChange={(_, s) => setFilter({ from: s[0] || undefined, to: s[1] || undefined })} />
        </Space>

        <Table<AdminEvaluation>
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={items}
          scroll={{ x: 1000 }}
          pagination={{ current: page, pageSize: PAGE_SIZE, total, showSizeChanger: false, showTotal: (t) => `${t} evaluasi`, onChange: setPage }}
          onRow={(r) => ({ onClick: () => open(r), style: { cursor: 'pointer' } })}
        />
      </Card>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        width={520}
        title="Detail evaluasi"
        destroyOnClose
      >
        {selected && (
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Tanggal">{formatDate(selected.created_at)}</Descriptions.Item>
              <Descriptions.Item label="Kategori">{catLabel(selected.category)}</Descriptions.Item>
              <Descriptions.Item label="Rating"><Rate disabled value={selected.rating} /></Descriptions.Item>
              <Descriptions.Item label="Pengirim">
                {selected.is_anonymous ? 'Anonim' : selected.reporter_name}
              </Descriptions.Item>
              <Descriptions.Item label="Yang sudah bagus">
                <span style={{ whiteSpace: 'pre-wrap' }}>{selected.positive_feedback ?? '—'}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Perlu ditingkatkan">
                <span style={{ whiteSpace: 'pre-wrap' }}>{selected.improvements_needed ?? '—'}</span>
              </Descriptions.Item>
            </Descriptions>

            <div>
              <Typography.Text strong>Status</Typography.Text>
              <Select
                style={{ width: '100%', marginTop: 6 }}
                value={status}
                options={(Object.keys(STATUS_META) as Status[]).map((s) => ({ value: s, label: STATUS_META[s].label }))}
                onChange={setStatus}
              />
              <Typography.Text strong style={{ display: 'block', marginTop: 14 }}>
                Catatan internal (tidak terlihat siswa)
              </Typography.Text>
              <Input.TextArea
                style={{ marginTop: 6 }}
                rows={4}
                maxLength={1000}
                showCount
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                type="primary"
                style={{ marginTop: 12 }}
                disabled={!dirty}
                loading={busy}
                onClick={() => patch({ status, internal_note: note }, 'Perubahan disimpan.')}
              >
                Simpan
              </Button>
            </div>

            <Space wrap>
              <Button loading={busy} onClick={() => patch({ hidden: !selected.hidden_at }, selected.hidden_at ? 'Evaluasi ditampilkan lagi.' : 'Evaluasi disembunyikan.')}>
                {selected.hidden_at ? 'Tampilkan lagi' : 'Sembunyikan'}
              </Button>
              <Popconfirm
                title="Hapus permanen?"
                description="Data tidak bisa dikembalikan. Gunakan Sembunyikan jika ragu."
                okText="Hapus"
                okButtonProps={{ danger: true }}
                cancelText="Batal"
                onConfirm={remove}
              >
                <Button danger loading={busy}>Hapus permanen</Button>
              </Popconfirm>
            </Space>
          </Space>
        )}
      </Drawer>
    </main>
  );
}
