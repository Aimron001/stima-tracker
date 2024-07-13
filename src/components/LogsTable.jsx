import {useState}from 'react';
import { DataGrid } from '@mui/x-data-grid';
import UpdateReading from './updateReading';
import ConfirmationModal from './updateConfirmationModal';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { toast } from "react-toastify"
import { db } from '../firebase';

export default function LogsTable(props) {
  
  // const [up]  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  
  const handleUpdate = async (newData, id) => {
    try {
      console.log(newData, id)
      await updateDoc(doc(db, "readings", id), newData);
      props.change(prev=> !prev)
      setSelectedLog(null);
      toast.success("Updated successfully.");
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating reading:", error);
      toast.error("Failed to update reading."); // Or provi a more user-friendly error message
    }
  };
  
  const handleOpenDeleteModal = (row) => {
    setSelectedLog(row);
    setDeleteModalOpen(true);
  };
  const handleOpenUpdateModal = (row) => {
    setSelectedLog(row);
    setUpdateModalOpen(true)
  };
  
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  
  const handleConfirmDelete =  async (id) => {
    await deleteDoc(doc(db, "readings",id))
    props.change(prev=> !prev)
    toast.info(`Deleted reading.`);
    handleCloseDeleteModal();
  };
  
  
  
  const columns = [
    { field: 'tenantName', headerName: 'Tenant name', width: 130 },
    { field: 'prevReading', headerName: 'Previous Reading', width: 130 },
    { field: 'reading', headerName: 'Reading', width: 80 },
    { field: 'toBePaid', headerName: 'To be paid', width: 100 },
    { field: 'paid', headerName: 'Paid', width: 50 },
    { field: 'deficit', headerName: 'Deficit', width: 70 },
    { field: 'readingDate', headerName: 'Reading Date', width: 100 },
    { field: 'nextReadingDate', headerName: 'Next Reading Date', width: 140 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <button className="updateBtn" onClick={() => handleOpenUpdateModal(params.row)}>Update</button>
          <button className="deleteBtn" onClick={() => handleOpenDeleteModal(params.row)}>Delete</button>
        </>
      ),
    },
  ];
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        item={`${selectedLog?.tenantName} readings`}
        id={selectedLog?.id}
      />
      {updateModalOpen && <UpdateReading data={selectedLog} handleUpdate={handleUpdate}/>}
    </div>
  );
}
