import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import { getPenyuluhById, updatePenyuluh } from "../../api/api";
import { Form, Row, Col, Button, Alert, Container, Spinner } from "react-bootstrap";

export default function EditDataPenyuluhPage() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL params
  
  // State untuk form data
  const [formData, setFormData] = useState({
    penyuluhId: "",
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
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fungsi untuk mengambil data penyuluh berdasarkan ID
  const fetchPenyuluhData = async () => {
    try {
        setFetching(true);
        const response = await getPenyuluhById(authUser, id);
        
        console.log("Response dari API:", response); // Debugging
        
        // Perhatikan: response.code adalah string "200", bukan number 200
        if (response.code === "200" || response.code === 200) {
            // Data berada di response.response (sesuai struktur Anda)
            const penyuluhData = response.response;
            
            // Format data untuk form - konversi number ke string jika needed
            const formattedData = {
            penyuluhId: penyuluhData.penyuluhId,
            namaPenyuluh: penyuluhData.namaPenyuluh || "",
            nipPenyuluh: penyuluhData.nipPenyuluh?.toString() || "", // Convert number to string
            jenisKelamin: penyuluhData.jenisKelamin || "L",
            tempatLahir: penyuluhData.tempatLahir || "",
            tanggalLahir: penyuluhData.tanggalLahir || "", // Sudah format YYYY-MM-DD
            golongan: penyuluhData.golongan || "",
            jabatanPenyuluh: penyuluhData.jabatanPenyuluh || "",
            jurusanPenyuluh: penyuluhData.jurusanPenyuluh || "",
            tempatTugas: penyuluhData.tempatTugas || "",
            nomorTelepon: penyuluhData.nomorTelepon || "",
            pendidikanTerakhir: penyuluhData.pendidikanTerakhir || "",
            kecamatan: penyuluhData.kecamatan || "",
            provinsi: penyuluhData.provinsi || ""
            };
            
            console.log("Formatted data untuk form:", formattedData); // Debugging
            setFormData(formattedData);
        } else {
            setError("Gagal mengambil data penyuluh: " + (response.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Error dalam fetchPenyuluhData:", error);
        setError("Terjadi kesalahan saat mengambil data: " + error.message);
    } finally {
        setFetching(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPenyuluhData();
    }
  }, [id]);

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
      // Panggil fungsi updatePenyuluh
      const response = await updatePenyuluh(authUser, formData);
      
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

  if (fetching) {
    return (
      <div className="d-flex">
        <Sidebar />
        <Container fluid className="p-4 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Memuat data penyuluh...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <Container fluid className="p-4">
        <h2 className="text-start mb-4 fw-bold">Edit Data Penyuluh</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Kolom Kiri */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-start d-block fw-semibold">Nama</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">NIP</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Jenis Kelamin</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Tempat Lahir</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label className="text-start d-block fw-semibold">No HP</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Golongan</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Jabatan Penyuluh</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Tempat Tugas</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Pendidikan Terakhir</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Jurusan</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Kecamatan</Form.Label>
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
                <Form.Label className="text-start d-block fw-semibold">Provinsi</Form.Label>
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
              disabled={loading}
            >
              Batal
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}