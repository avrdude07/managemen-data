import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getPenyuluhData, deletePenyuluh } from "../../api/api"; // Anda perlu membuat fungsi API ini
import { format } from "date-fns";
import ConfirmDialog from "../../components/ConfirmationModal";
import { Pagination, Form, Row, Col, Button } from "react-bootstrap";
import ActionButtons from "./ActionButtons"; // Import komponen tombol aksi

export default function DataPenyuluhanPage() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [dataPenyuluh, setDataPenyuluh] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paging, setPaging] = useState({
    currentData: 0,
    currentPage: 1,
    totalPage: 1,
    pageSize: 10,
    totalData: 0
  });

  // Tambahkan useEffect khusus untuk menangani reset
  useEffect(() => {
    if (searchTerm === "" && paging.currentPage === 1) {
      fetchDataPenyuluh();
    }
  }, [searchTerm, paging.currentPage]);
  
  const fetchDataPenyuluh = async () => {
    try {
      setLoading(true);
      
      // Siapkan parameter untuk API
      const params = {
        offset: paging.currentPage,
        limit: paging.pageSize
      };
      
      // Tambahkan parameter pencarian hanya jika searchTerm tidak kosong
      if (searchTerm.trim() !== '') {
        params.namaPenyuluh = searchTerm;
      }
      
      const response = await getPenyuluhData(authUser, params);
      
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

  // Tambahkan fungsi ini di dalam component DataPenyuluhanPage (setelah fungsi lainnya)
  const handleDelete = async () => {
    try {
      // Panggil API delete
      const response = await deletePenyuluh(authUser, selectedId);
      
      // Cek jika response memiliki code 200 atau operasi berhasil
      if (response.code === 200 || response.status === 200) {
        // Hapus data dari tampilan tanpa perlu reload halaman
        const newData = dataPenyuluh.filter(item => item.penyuluhId !== selectedId);
        setDataPenyuluh(newData);
        
        // Tampilkan pesan sukses
        alert('Data berhasil dihapus!');
        
        // Jika halaman kosong setelah penghapusan dan bukan halaman pertama,
        // kembali ke halaman sebelumnya
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

  const handleSearch = (e) => {
    e.preventDefault();
    // Set halaman ke 1 dan langsung panggil fetchData
    setPaging({...paging, currentPage: 1});
    fetchDataPenyuluhDirect(1);
  };

  const handleResetSearch = () => {
    setSearchTerm(""); // Kosongkan pencarian
    setPaging({...paging, currentPage: 1}); // Kembali ke halaman 1
  };

  const handlePageChange = (page) => {
    // Update state
    setPaging({...paging, currentPage: page});
    
    // Langsung fetch dengan page yang baru
    fetchDataPenyuluhDirect(page);
  };

  const fetchDataPenyuluhDirect = async (pageNumber) => {
    try {
      setLoading(true);
      
      const params = {
        offset: pageNumber, // ✅ Langsung gunakan parameter
        limit: paging.pageSize
      };
      
      if (searchTerm.trim() !== '') {
        params.namaPenyuluh = searchTerm;
      }
      
      const response = await getPenyuluhData(authUser, params);
      
      if (response.code === 200) {
        setDataPenyuluh(response.response.data);
        // Update paging dengan response dari server
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

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(paging.currentPage - 1)}
        disabled={paging.currentPage === 1}
      />
    );

    // Page numbers
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

    // Next button
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

        {/* Search and Add Button */}
        <Row className="mb-4">
          <Col md={8}>
            <Form onSubmit={handleSearch} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Cari data nama penyuluh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Ini HANYA mengubah state, tidak fetch data
                className="me-2"
              />
              <Button type="submit" variant="primary" className="me-2">
                Cari
              </Button>
              {searchTerm && (
                <Button 
                  variant="outline-secondary" 
                  onClick={handleResetSearch}
                  title="Reset pencarian"
                >
                  ✕
                </Button>
              )}
            </Form>
          </Col>
          <Col md={4} className="text-end">
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
                    <td>{item.jabatanPenyuluh}</td>
                    <td>{item.tempatTugas}</td>
                    <td>{item.pendidikanTerakhir}</td>
                    <td>{item.jurusanPenyuluh}</td>
                    <td>{item.nomorTelepon}</td>
                    <td>{item.kecamatan}</td>
                    <td>{item.provinsi}</td>
                    <td>{formatDate(item.makerDate)}</td>
                    <td>
                      {/* Penggunaan komponen ActionButtons yang dipersingkat */}
                      <ActionButtons
                        onEdit={() => {
                          // Navigasi ke halaman edit
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
          onConfirm={handleDelete} // Ini yang penting - panggil handleDelete
          title="Hapus Data Penyuluh"
          message="Apakah Anda yakin ingin menghapus data ini?"
        />
      </div>
    </div>
  );
}