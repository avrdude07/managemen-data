import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import "./HomePage.css";
import kemenagLogo from "../../assets/kemenag-logo.png"; // Import logo
import { getPenyuluhData } from "../../api/api"; // Anda perlu membuat fungsi API ini


export default function HomePage() {
  const { authUser } = useAuthContext();
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataCount = async () => {
      try {
        // Panggil API dengan parameter kosong (hanya untuk mendapatkan jumlah data)
        const response = await getPenyuluhData(authUser, {
          offset: 1,
          limit: 10,
          downloadExcel: 'N' // Parameter khusus untuk download
        });
        
        // Ambil totalData dari response
        setTotalData(response.response.paging.totalData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data count:", err);
        setError("Gagal memuat jumlah data");
        setLoading(false);
      }
    };

    fetchDataCount();
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        {/* Header */}
        <header className="header-bar">
          <div className="header-center">
            <h2 className="main-title">Sistem Pengelolaan Data</h2>
            <img
              src={kemenagLogo}
              alt="Logo Kemenag"
              className="logo-kemenag"
            />
            <h3 className="sub-title">
              Kementerian Agama Kanwil Kalimantan Timur
            </h3>
          </div>
        </header>

        <div className="home-container">
          {/* Section Title */}
          <h2 className="section-title">BIMAS KATOLIK</h2>

          {/* 3 Kolom Section */}
          <div className="grid-sections">
            {/* Visi */}
            <div className="box visi">
              <h3>Visi</h3>
              <p>
                Kementerian Agama yang profesional dan andal dalam membangun
                masyarakat yang saleh, moderat, cerdas dan unggul untuk
                mewujudkan Indonesia maju yang berdaulat, mandiri, dan
                berkepribadian berdasarkan gotong royong
              </p>
            </div>

            {/* Foto + Judul + Caption */}
            <div className="foto-wrapper">
              <div className="foto-box-container">
                <h3 className="foto-title">Meet Our Team</h3>
                <img
                  src="src/assets/foto-team.jpeg"
                  alt="Foto Kegiatan"
                  className="foto-box"
                />
                <p className="foto-caption">
                  {loading ? "Memuat data..." : error ? error : `Jumlah Data : ${totalData}`}
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="box misi">
              <h3>Misi</h3>
              <ol>
                <li>Meningkatkan kualitas kesalehan umat beragama;</li>
                <li>
                  Memperkuat moderasi beragama dan kerukunan umat beragama;
                </li>
                <li>Meningkatkan layanan keagamaan yang adil, mudah dan merata;</li>
                <li>Meningkatkan layanan pendidikan yang merata dan bermutu;</li>
                <li>Meningkatkan produktivitas dan daya saing pendidikan;</li>
                <li>
                  Memantapkan tata kelola pemerintahan yang baik (Good
                  Governance).
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer-bar">
          <p>
            © 2025 Kementerian Agama RI - Sistem Manajemen Data Penyuluh
          </p>
        </footer>
      </div>
    </div>
  );
}
