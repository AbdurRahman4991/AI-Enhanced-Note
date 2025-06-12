import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Table, Space, Button, Modal, Input, Form } from 'antd';
import { route } from 'ziggy-js';
const Home = ({ notes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const { data, setData, post, put, delete: destroy, reset } = useForm({
    title: '',
    content: '',
  });

  const handleSubmit = () => {
  if (editingNote) {
    put(route('notes.update', editingNote.id), {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      },
    });
  } else {
    post(route('notes.store'), {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      },
    });
  }
};


  const handleEdit = (note) => {
    setEditingNote(note);
    setData({ title: note.title, content: note.content });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    destroy(route('notes.destroy', id));
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const dataSource = notes.map(note => ({
    key: note.id,
    title: note.title,
    content: note.content,
  }));

  return (
    <div className="p-4">
      <Button type="primary" onClick={() => { setEditingNote(null); setIsModalOpen(true); }}>
        Add Note
      </Button>
      <Table className="mt-4" columns={columns} dataSource={dataSource} />

      <Modal
        title={editingNote ? 'Edit Note' : 'Add Note'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={data.title} onChange={e => setData('title', e.target.value)} />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea value={data.content} onChange={e => setData('content', e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
