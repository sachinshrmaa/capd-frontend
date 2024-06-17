import { Button, Form, Modal, Select } from "antd";
import axios from "axios";

type AssignSubjectTeacherProps = {
  isModalOpen: boolean;
  setIsModalOpen: (e: boolean) => void;
  teachers: any[];
  subjectProp: any;
};

export default function AssignSubjectTeacher({
  isModalOpen,
  setIsModalOpen,
  teachers,
  subjectProp,
}: AssignSubjectTeacherProps) {
  const handleAssignTeacher = async (e: any) => {
    let payload = {
      subjectId: subjectProp.subjectId,
      teacherId: e.teacherId,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/teachers/assign-subject-teacher",
        payload,
        { withCredentials: true }
      );
      console.log(res);
      setIsModalOpen(false);
    } catch (error: any) {
      setIsModalOpen(false);
      console.log(error.message);
    }
  };

  return (
    <Modal
      title="Assign Subject Teacher"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleAssignTeacher}>
        <Form.Item
          label="Select Teacher"
          name="teacherId"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Teacher">
            {teachers.map((teacher: any) => (
              <Select.Option value={teacher.teacher_id}>
                {teacher.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Assign
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
