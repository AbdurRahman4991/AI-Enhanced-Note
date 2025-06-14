import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Table, Space, Button, Modal, Input, Form, Typography, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { route } from 'ziggy-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;

const Home = ({ notes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const { data, setData, post, delete: destroy, reset } = useForm({
    title: '',
    content: '',
  });

  const handleSubmit = () => {
    const action = editingNote ? route('notes.update', { note: editingNote.id }) : route('notes.store');
    post(action, {
      preserveScroll: true,
      ...data,
      onSuccess: () => {
        toast.success(editingNote ? 'Note updated!' : 'Note created!');
        closeModal();
      },
      onError: () => {
        toast.error(editingNote ? 'Update failed.' : 'Creation failed.');
      },
    });
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setData({ title: note.title, content: note.content });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    destroy(route('notes.destroy', { note: id }), {
      preserveScroll: true,
      onSuccess: () => toast.success('Note deleted!'),
      onError: () => toast.error('Delete failed.'),
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    reset();
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      responsive: ['md'],
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this note?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = notes.map(note => ({
    key: note.id,
    id: note.id,
    title: note.title,
    content: note.content,
  }));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>My Notes</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingNote(null);
            reset();
            setIsModalOpen(true);
          }}
        >
          Add Note
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        bordered
        className="shadow-md rounded-md"
      />

      <Modal
        title={editingNote ? 'Edit Note' : 'Add Note'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        okText={editingNote ? 'Update' : 'Create'}
        destroyOnClose
      >
        <Form layout="vertical" className="pt-2">
          <Form.Item label="Title" required>
            <Input
              placeholder="Enter note title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Content" required>
            <Input.TextArea
              rows={4}
              placeholder="Enter note content"
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
