import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { doc, setDoc, deleteDoc, collection} from "firebase/firestore"
import { db } from '../firebase';
import ConfirmationModal from './updateConfirmationModal';
import { toast } from 'react-toastify';
import UpdateTenant from './UpdateTenant';


export default function MyTenantsTable(props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  
  const handleUpdate = async (newData, id) => {
    try {

      await setDoc(doc(db, "tenants", id), newData);
      props.change(prev=> !prev)
      setSelectedTenant(null);
      toast.success("Updated successfully.");
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating tenant:", error);
      toast.error("Failed to update tenant."); // Or provide a more user-friendly error message
    }
  };
  
  const handleOpenDeleteModal = (row) => {
    setSelectedTenant(row);
    setDeleteModalOpen(true);
  };
  const handleOpenUpdateModal = (row) => {
    setSelectedTenant(row);
    setUpdateModalOpen(true)
  };
  
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  
  const handleConfirmDelete =  async (id) => {
    await deleteDoc(doc(db, "tenants",id))
    props.change(prev=> !prev)
    // alert('i')
    toast.info(`Deleted tenant.`);
    handleCloseDeleteModal();
  };
  const columns = [
    { field: 'tenantName', headerName: 'Tenant Name', width: 130 },
    { field: 'startingDate', headerName: 'Starting Date', width: 130 },
    { field: 'initialReading', headerName: 'Initial Reading', width: 130 },
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
        rows={props.tenantsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        item={selectedTenant?.tenantName}
        id={selectedTenant?.id}
      />
      {updateModalOpen && <UpdateTenant  tenant={selectedTenant} handleUpdate={handleUpdate} open={setUpdateModalOpen}/> }
    </div>
  );
}
