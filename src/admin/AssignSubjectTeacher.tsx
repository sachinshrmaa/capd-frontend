import { Form, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

type AssignSubjectTeacherProps = {
  isModalOpen: boolean;
  setIsModalOpen: (e: boolean) => void;
};

export default function AssignSubjectTeacher({
  isModalOpen,
  setIsModalOpen,
}: AssignSubjectTeacherProps) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    let payload = { department: "Computer Engineering" };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/teachers/list-teachers",
        payload,
        { withCredentials: true }
      );

      setTeachers(res?.data?.teachers);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleOk = () => {
    console.log("assign teacher");
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Assign Subject Teacher"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={() => setIsModalOpen(false)}
      okText="Assign"
    >
      <Form layout="vertical">
        <Form.Item label="Select Subject" name="subjectId">
          <Select placeholder="Select Subject">
            <Select.Option>Abse</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Select Teacher" name="teacherId">
          <Select placeholder="Select Teacher">
            {teachers.map((teacher: any) => (
              <Select.Option value={teacher.teacher_id}>
                {teacher.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
