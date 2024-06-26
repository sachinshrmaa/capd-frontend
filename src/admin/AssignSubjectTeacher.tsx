import { Button, Form, Modal, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleAssignTeacher = async (e: any) => {
    let payload = {
      subjectId: subjectProp.subjectId,
      teacherId: e.teacherId,
    };
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API_URL
        }/teachers/assign-subject-teacher`,
        payload,
        { withCredentials: true }
      );
      console.log(res);
      navigate("/admin/subjects");
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
