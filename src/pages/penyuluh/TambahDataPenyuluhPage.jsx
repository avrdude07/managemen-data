import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import { createPenyuluh } from "../../api/api"; // Anda perlu membuat fungsi API ini
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

export default function TambahDataPenyuluhPage() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  
  // State untuk form data
  const [formData, setFormData] = useState({
    namaPenyuluh: "",
    nipPenyuluh: "",
    jenisKelamin: "L",
    tempatLahir: "",
    tanggalLahir: "",
    golongan: "",
    jabatanPenyuluh: "",
    jurusanPenyuluh: "",
    tempatTugas: "",
    nomorTelepon: "",
    pendidikanTerakhir: "",
    kecamatan: "",
    provinsi: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      // Panggil fungsi createPenyuluh
      const response = await createPenyuluh(authUser, formData);
      
      // Sesuaikan dengan struktur response API Anda
      if (response.code === 200 || response.status === 200) {
        setSuccess("Data penyuluh berhasil ditambahkan!");
        setTimeout(() => {
          navigate("/penyuluh"); // Redirect ke halaman data penyuluh
        }, 1500);
      } else {
        setError(response.message || "Gagal menambahkan data");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Terjadi kesalahan saat menambahkan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="p-5" style={{ width: "100%" }}>
        <h2 className="text-center mb-4" style={{ textAlign: 'left' }}>Tambah Data Penyuluh</h2>
        
        {/* Alert untuk error/success */}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Kolom Kiri */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="namaPenyuluh"
                  value={formData.namaPenyuluh}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama penyuluh"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>NIP</Form.Label>
                <Form.Control
                  type="text"
                  name="nipPenyuluh"
                  value={formData.nipPenyuluh}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan NIP"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Jenis Kelamin</Form.Label>
                <Form.Select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  required
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Tempat Lahir</Form.Label>
                <Form.Control
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan tempat lahir"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>No HP</Form.Label>
                <Form.Control
                  type="text"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nomor telepon"
                />
              </Form.Group>
            </Col>
            
            {/* Kolom Kanan */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Golongan</Form.Label>
                <Form.Control
                  type="text"
                  name="golongan"
                  value={formData.golongan}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: III-a"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Jabatan Penyuluh</Form.Label>
                <Form.Control
                  type="text"
                  name="jabatanPenyuluh"
                  value={formData.jabatanPenyuluh}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan jabatan"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Tempat Tugas</Form.Label>
                <Form.Control
                  type="text"
                  name="tempatTugas"
                  value={formData.tempatTugas}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan tempat tugas"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Pendidikan Terakhir</Form.Label>
                <Form.Control
                  type="text"
                  name="pendidikanTerakhir"
                  value={formData.pendidikanTerakhir}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: S1, S2, dll"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Jurusan</Form.Label>
                <Form.Control
                  type="text"
                  name="jurusanPenyuluh"
                  value={formData.jurusanPenyuluh}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan jurusan"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Kecamatan</Form.Label>
                <Form.Control
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan kecamatan"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold' }}>Provinsi</Form.Label>
                <Form.Control
                  type="text"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan provinsi"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <div className="d-flex justify-content-end mt-4">
            <Button 
              variant="secondary" 
              className="me-2"
              onClick={() => navigate("/penyuluh")}
            >
              Batal
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Data"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}