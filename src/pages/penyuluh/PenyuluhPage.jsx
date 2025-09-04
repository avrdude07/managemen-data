import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getPenyuluhData, deletePenyuluh } from "../../api/api";
import { format } from "date-fns";
import ConfirmDialog from "../../components/ConfirmationModal";
import { Pagination, Form, Row, Col, Button, Modal } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

export default function DataPenyuluhanPage() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [dataPenyuluh, setDataPenyuluh] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [paging, setPaging] = useState({
    currentData: 0,
    currentPage: 1,
    totalPage: 1,
    pageSize: 10,
    totalData: 0
  });

  // State untuk modal filter
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterNama, setFilterNama] = useState("");
  const [filterNip, setFilterNip] = useState("");

  // State untuk melacak jenis filter yang aktif
  const [activeFilter, setActiveFilter] = useState({
    type: null, // 'nama', 'nip', atau 'both'
    namaValue: "",
    nipValue: ""
  });

  useEffect(() => {
    if (!activeFilter.type && paging.currentPage === 1) {
      fetchDataPenyuluh();
    }
  }, [paging.currentPage]);
  
  const fetchDataPenyuluh = async (params = {}) => {
    try {
      setLoading(true);
      
      const defaultParams = {
        offset: paging.currentPage,
        limit: paging.pageSize,
        ...params
      };
      
      const response = await getPenyuluhData(authUser, defaultParams);
      
      if (response.code === 200) {
        setDataPenyuluh(response.response.data);
        setPaging({
          currentData: parseInt(response.response.paging.currentData),
          currentPage: parseInt(response.response.paging.currentPage),
          totalPage: parseInt(response.response.paging.totalPage),
          pageSize: parseInt(response.response.paging.pageSize),
          totalData: parseInt(response.response.paging.totalData)
        });
      }
    } catch (error) {
      console.log(error);
      setDataPenyuluh([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      // Siapkan parameter berdasarkan filter aktif
      const params = {
        offset: 1,
        limit: paging.totalData,
        downloadExcel: 'Y'
      };
      
      // Tambahkan parameter sesuai jenis filter
      if (activeFilter.type === 'nama') {
        params.namaPenyuluh = activeFilter.namaValue;
      } else if (activeFilter.type === 'nip') {
        params.nipPenyuluh = activeFilter.nipValue;
      } else if (activeFilter.type === 'both') {
        params.namaPenyuluh = activeFilter.namaValue;
        params.nipPenyuluh = activeFilter.nipValue;
      }
      
      const response = await getPenyuluhData(authUser, params);
      
      if (response instanceof Blob) {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        
        const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        a.download = `Data_Penyuluh_${currentDate}.xlsx`;
        
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.log('Response is not a file:', response);
        alert('Terjadi kesalahan saat mengunduh file');
      }
    } catch (error) {
      console.error("Download error:", error);
      alert('Terjadi kesalahan saat mengunduh file');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deletePenyuluh(authUser, selectedId);
      
      if (response.code === 200 || response.status === 200) {
        const newData = dataPenyuluh.filter(item => item.penyuluhId !== selectedId);
        setDataPenyuluh(newData);
        
        alert('Data berhasil dihapus!');
        
        if (newData.length === 0 && paging.currentPage > 1) {
          setPaging({...paging, currentPage: paging.currentPage - 1});
        }
      } else {
        alert('Gagal menghapus data: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert('Terjadi kesalahan saat menghapus data');
    } finally {
      // Tutup dialog konfirmasi
      setShowDialog(false);
      setSelectedId(null);
    }
  };

  // Fungsi untuk menerapkan filter
  const applyFilter = () => {
    const params = {};
    let filterType = null;
    
    if (filterNama.trim() && filterNip.trim()) {
      // Jika kedua filter diisi
      params.namaPenyuluh = filterNama;
      params.nipPenyuluh = filterNip;
      filterType = 'both';
    } else if (filterNama.trim()) {
      // Jika hanya nama diisi
      params.namaPenyuluh = filterNama;
      filterType = 'nama';
    } else if (filterNip.trim()) {
      // Jika hanya NIP diisi
      params.nipPenyuluh = filterNip;
      filterType = 'nip';
    }
    
    setActiveFilter({ 
      type: filterType, 
      namaValue: filterNama,
      nipValue: filterNip
    });
    setPaging({...paging, currentPage: 1});
    setShowFilterModal(false);
    
    // Jika ada filter, langsung fetch data
    if (filterType) {
      fetchDataPenyuluhDirect(1, params);
    } else {
      // Jika tidak ada filter, fetch semua data
      fetchDataPenyuluhDirect(1, {});
    }
  };

  // Fungsi untuk reset filter
  const resetFilter = () => {
    setFilterNama("");
    setFilterNip("");
    setActiveFilter({ type: null, namaValue: "", nipValue: "" });
    setPaging({...paging, currentPage: 1});
    setShowFilterModal(false);
    
    // Fetch data tanpa filter
    fetchDataPenyuluhDirect(1, {});
  };

  const handlePageChange = (page) => {
    setPaging({...paging, currentPage: page});
    
    // Siapkan parameter berdasarkan filter aktif
    const params = {};
    if (activeFilter.type === 'nama') {
      params.namaPenyuluh = activeFilter.namaValue;
    } else if (activeFilter.type === 'nip') {
      params.nipPenyuluh = activeFilter.nipValue;
    } else if (activeFilter.type === 'both') {
      params.namaPenyuluh = activeFilter.namaValue;
      params.nipPenyuluh = activeFilter.nipValue;
    }
    
    fetchDataPenyuluhDirect(page, params);
  };

  const fetchDataPenyuluhDirect = async (pageNumber, params = {}) => {
    try {
      setLoading(true);
      
      const defaultParams = {
        offset: pageNumber,
        limit: paging.pageSize,
        ...params
      };
      
      const response = await getPenyuluhData(authUser, defaultParams);
      
      if (response.code === 200) {
        setDataPenyuluh(response.response.data);
        setPaging({
          currentData: parseInt(response.response.paging.currentData),
          currentPage: parseInt(response.response.paging.currentPage),
          totalPage: parseInt(response.response.paging.totalPage),
          pageSize: parseInt(response.response.paging.pageSize),
          totalData: parseInt(response.response.paging.totalData)
        });
      }
    } catch (error) {
      console.log(error);
      setDataPenyuluh([]);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menampilkan label filter aktif
  const renderActiveFilterLabel = () => {
    if (activeFilter.type === 'nama') {
      return `Nama: ${activeFilter.namaValue}`;
    } else if (activeFilter.type === 'nip') {
      return `NIP: ${activeFilter.nipValue}`;
    } else if (activeFilter.type === 'both') {
      return `Nama: ${activeFilter.namaValue}, NIP: ${activeFilter.nipValue}`;
    }
    return null;
  };

  const formatDate = (timestamp) => {
    return format(new Date(parseInt(timestamp)), "dd/MM/yyyy");
  };

  const renderPagination = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, paging.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(paging.totalPage, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(paging.currentPage - 1)}
        disabled={paging.currentPage === 1}
      />
    );

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === paging.currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(paging.currentPage + 1)}
        disabled={paging.currentPage === paging.totalPage}
      />
    );

    return items;
  };

  if (loading) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="p-5" style={{ width: "100%" }}>
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="p-5" style={{ width: "100%" }}>
        <h2 className="text-center mb-4">Data Penyuluhan</h2>

        {/* Search and Add Button - TOMBOL FILTER DI SEBELAH KIRI */}
        <Row className="mb-4">
          <Col md={8}>
            <div className="d-flex align-items-center">
              {/* Tombol Filter - sekarang di sebelah kiri */}
              <Button 
                variant="primary" 
                onClick={() => setShowFilterModal(true)}
                className="me-2"
              >
                <i className="fas fa-filter me-2"></i>Filter Data
              </Button>
              
              {/* Tampilkan info filter aktif jika ada */}
              {activeFilter.type && (
                <div className="d-inline-block">
                  <span className="badge bg-info">
                    Filter: {renderActiveFilterLabel()}
                    <Button 
                      variant="link" 
                      className="text-white p-0 ms-2"
                      onClick={resetFilter}
                      title="Hapus filter"
                    >
                      ✕
                    </Button>
                  </span>
                </div>
              )}
            </div>
          </Col>
          <Col md={4} className="text-end">
            {/* Tombol Download Excel dan Tambah Data tetap di kanan */}
            <Button 
              variant="success" 
              onClick={handleDownloadExcel}
              className="me-2"
              style={{
                backgroundColor: "#10B981",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "500"
              }}
            >
              Download Excel
            </Button>
            <Link 
              to="/penyuluhan/tambah" 
              className="btn"
              style={{
                backgroundColor: "#F59E0B",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "500",
                textDecoration: "none",
                display: "inline-block"
              }}
            >
              Tambah Data
            </Link>
          </Col>
        </Row>

        {/* Modal Filter */}
        <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Filter Data Penyuluh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama Penyuluh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama penyuluh"
                  value={filterNama}
                  onChange={(e) => setFilterNama(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>NIP Penyuluh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan NIP penyuluh"
                  value={filterNip}
                  onChange={(e) => setFilterNip(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetFilter}>
              Reset
            </Button>
            <Button variant="primary" onClick={applyFilter}>
              Terapkan Filter
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NIP</th>
                <th>Jenis Kelamin</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Golongan</th>
                <th>Status ASN</th>
                <th>Jabatan</th>
                <th>Tempat Tugas</th>
                <th>Pendidikan</th>
                <th>Jurusan</th>
                <th>Telepon</th>
                <th>Kecamatan</th>
                <th>Provinsi</th>
                <th>Tanggal Dibuat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataPenyuluh.length > 0 ? (
                dataPenyuluh.map((item, index) => (
                  <tr key={item.penyuluhId}>
                    <td>{((paging.currentPage - 1) * paging.pageSize) + index + 1}</td>
                    <td>{item.namaPenyuluh}</td>
                    <td>{item.nipPenyuluh}</td>
                    <td>{item.jenisKelamin === 'P' ? 'Perempuan' : 'Laki-laki'}</td>
                    <td>{item.tempatLahir}</td>
                    <td>{item.tanggalLahir}</td>
                    <td>{item.golongan}</td>
                    <td>{item.statusAsn}</td>
                    <td>{item.jabatanPenyuluh}</td>
                    <td>{item.tempatTugas}</td>
                    <td>{item.pendidikanTerakhir}</td>
                    <td>{item.jurusanPenyuluh}</td>
                    <td>{item.nomorTelepon}</td>
                    <td>{item.kecamatan}</td>
                    <td>{item.provinsi}</td>
                    <td>{item.makerDate}</td>
                    <td>
                      <ActionButtons
                        onEdit={() => {
                          navigate(`/penyuluhan/edit/${item.penyuluhId}`);
                        }}
                        onDelete={() => {
                          setShowDialog(true);
                          setSelectedId(item.penyuluhId);
                        }}
                        editTitle="Edit Data Penyuluh"
                        deleteTitle="Hapus Data Penyuluh"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="16" className="text-center">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            Menampilkan Data Ke {paging.currentData} Hingga Data Ke {paging.currentData + dataPenyuluh.length - 1} dari {paging.totalData} data
          </div>
          <Pagination>
            {renderPagination()}
          </Pagination>
        </div>

        {/* Confirmation Dialog */}
        <ConfirmDialog
          show={showDialog}
          onHide={() => setShowDialog(false)}
          onConfirm={handleDelete}
          title="Hapus Data Penyuluh"
          message="Apakah Anda yakin ingin menghapus data ini?"
        />
      </div>
    </div>
  );
}