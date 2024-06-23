import { Button, Form, Table, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type WardsType = {
  name: string;
  roll_no: string;
  key: string;
};

const columns = [
  {
    title: "Student Name",
    dataIndex: "student_name",
    key: "student_name",
  },
  {
    title: "Roll No",
    dataIndex: "roll_no",
    key: "roll_no",
  },
  Table.SELECTION_COLUMN,
];

type StudentLogType = {
  roll_no: string;
};

export default function AddWardsAttendance() {
  const [toastNotification, toastNotificationHolder] = message.useMessage();
  const navigate = useNavigate();
  const [wards, setWards] = useState<WardsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [presentStudents, setPresentStudents] = useState<StudentLogType[]>([]);
  const [absentStudents, setAbsentStudents] = useState<StudentLogType[]>([]);
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/teachers/list-teacher-wards",
        { withCredentials: true }
      );
      const studentsWithKeys = res?.data?.wards.map((student: any) => ({
        ...student,
        key: student.roll_no,
      }));
      setTotalStudentsCount(res?.data?.wards.length);
      setWards(studentsWithKeys);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    let payload = {
      presentStudents: presentStudents,
      absentStudents: absentStudents,
      remarks: remarks,
    };
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/teachers/add-counselling-log",
        payload,
        { withCredentials: true }
      );
      toastNotification.success("Counselling Attendance logged successfully.");
      console.log(res);
      setIsSubmitting(false);
      setTimeout(() => {
        navigate("/teacher/wards/attendance");
      }, 1000);
    } catch (error: any) {
      setIsSubmitting(false);
      toastNotification.error("Failed to submit session attendance.");
      console.log(error.message);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRows(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );

      const absentRollNos: StudentLogType[] = selectedRows.map(
        (row: any) => row.roll_no
      );
      setAbsentStudents(absentRollNos);

      const unselectedRows: StudentLogType[] = wards.filter(
        (item) => !selectedRowKeys.includes(item.key)
      );
      const presentRollNos = unselectedRows.map((row: any) => row.roll_no);
      setPresentStudents(presentRollNos);

      console.log("unselectedRows: ", absentRollNos);
    },
  };

  return (
    <div className="my-3">
      {toastNotificationHolder}
      <div className="flex justify-between">
        <h1 className="font-bold text-lg mb-0">
          Log Wards Counselling Attendance
        </h1>
      </div>

      <div>
        <p className="my-4">Select the students to mark absent.</p>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={wards}
          rowSelection={rowSelection}
          pagination={false}
        />

        <div className="my-6">
          <Form layout="vertical">
            <Form.Item
              label="Remarks"
              rules={[
                {
                  required: true,
                  message: "Please write remarks",
                },
              ]}
            >
              <TextArea onChange={(e) => setRemarks(e.target.value)} />
            </Form.Item>
          </Form>
        </div>

        <div className="flex justify-between bg-slate-100 align-center p-6 rounded-lg border my-8">
          <div>
            <span className="mr-4">
              Present: {totalStudentsCount - selectedRows.length}
            </span>
            <span>Absent: {selectedRows.length} </span>
          </div>
          <Button type="primary" onClick={handleSubmit} loading={isSubmitting}>
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
