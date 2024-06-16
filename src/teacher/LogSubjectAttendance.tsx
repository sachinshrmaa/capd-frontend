import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const columns = [
  {
    key: "roolNo",
    title: "Roll No.",
    dataIndex: "roll_no",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  Table.SELECTION_COLUMN,
];

type StudentListType = {
  key: string;
  roll_no: string;
  name: string;
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LogSubjectAttendance() {
  // const [toastNotification, toastNotificationHolder] = message.useMessage();
  let query = useQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [studentsList, setStudentsList] = useState<StudentListType[]>([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);

  let subject = query.get("subjectName");
  let subjectCode = query.get("subjectCode");

  useEffect(() => {
    fetchStudents();
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRows(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const fetchStudents = async () => {
    let payload = {
      subjectCode: subjectCode,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/attendance/list-students",
        payload,
        { withCredentials: true }
      );

      const studentsWithKeys = res?.data?.students.map((student: any) => ({
        ...student,
        key: student.roll_no,
      }));
      setTotalStudentsCount(res?.data?.students.length);

      setStudentsList(studentsWithKeys);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {};

  return (
    <div>
      {/* {toastNotificationHolder} */}
      <div className="flex justify-between">
        <h1 className="font-bold text-lg mb-0">Log Attendance</h1>

        <h1 className="font-bold text-lg mb-0">{subject}</h1>
      </div>

      <div>
        <p className="my-4">Select the students to mark absent.</p>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={studentsList}
          rowSelection={rowSelection}
          pagination={false}
        />

        <div className="flex justify-between bg-slate-100 align-center p-6 rounded-lg border my-8">
          <div>
            <span className="mr-4">
              Present: {totalStudentsCount - selectedRows.length}
            </span>
            <span>Absent: {selectedRows.length} </span>
          </div>
          <Button type="primary" onClick={handleSubmit}>
            {/* {isSubmitting ? "Submitting" : "Submit"} */}
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
