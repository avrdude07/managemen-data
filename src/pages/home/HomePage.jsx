import Sidebar from "../../components/Sidebar";
import "./HomePage.css"; // File CSS untuk styling tambahan

export default function HomePage() {
  return (
    <div className="d-flex">
      <Sidebar />
      
      <div className="p-5" style={{ width: "100%" }}>
        <div className="home-container">
          <h1 className="text-center mb-4">Selamat Datang di Sistem Data Penyuluhan</h1>
          
          <div className="demon-slayer-section">
            <h2 className="text-center mb-4">Sinopsis Demon Slayer</h2>
            
            <div className="anime-card">
              <div className="anime-header">
                <h3>鬼滅の刃 (Kimetsu no Yaiba)</h3>
                <div className="anime-rating">⭐ 9.2/10</div>
              </div>
              
              <div className="anime-content">
                <div className="anime-poster">
                  <div className="poster-placeholder">
                    <span>Demon Slayer Poster</span>
                  </div>
                </div>
                
                <div className="anime-synopsis">
                  <p>
                    Demon Slayer menceritakan kisah Tanjiro Kamado, seorang pemuda baik hati yang menjadi pembasmi iblis 
                    setelah keluarganya dibantai dan adik perempuannya, Nezuko, diubah menjadi iblis.
                  </p>
                  
                  <p>
                    Terlepas dari transformasinya, Nezuko masih menunjukkan tanda-tanda emosi dan pemikiran manusia. 
                    Tanjiro berjanji untuk menemukan cara mengembalikan Nezuko menjadi manusia dan membalas dendam 
                    pada iblis yang menghancurkan keluarganya.
                  </p>
                  
                  <p>
                    Bersama Nezuko, Tanjiro bergabung dengan Korps Pembasmi Iblis dan memulai perjalanan berbahaya 
                    melalui dunia yang penuh dengan iblis dan pembasmi iblis.
                  </p>
                  
                  <h4>Karakter Utama:</h4>
                  <ul>
                    <li><strong>Tanjiro Kamado</strong> - Protagonis dengan indra penciuman yang tajam</li>
                    <li><strong>Nezuko Kamado</strong> - Adik perempuan Tanjiro yang berubah menjadi iblis</li>
                    <li><strong>Zenitsu Agatsuma</strong> - Pembasmi iblis yang penakut tapi kuat saat tidur</li>
                    <li><strong>Inosuke Hashibira</strong> - Pembasmi iblis liar yang dibesarkan oleh babi hutan</li>
                  </ul>
                </div>
              </div>
              
              <div className="anime-info">
                <div className="info-item">
                  <span className="info-label">Tayang:</span>
                  <span className="info-value">April 2019 - Sekarang</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Genre:</span>
                  <span className="info-value">Action, Fantasy, Shounen, Supernatural</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Studio:</span>
                  <span className="info-value">Ufotable</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Pengarang:</span>
                  <span className="info-value">Koyoharu Gotouge</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="system-info mt-5">
            <h3 className="text-center mb-3">Tentang Sistem Ini</h3>
            <div className="info-cards">
              <div className="info-card">
                <h4>📊 Kelola Data</h4>
                <p>Sistem ini memungkinkan Anda mengelola data penyuluh dengan mudah dan efisien.</p>
              </div>
              <div className="info-card">
                <h4>🔍 Pencarian Cepat</h4>
                <p>Temukan data yang Anda butuhkan dengan fitur pencarian yang powerful.</p>
              </div>
              <div className="info-card">
                <h4>📥 Export Data</h4>
                <p>Unduh data dalam format Excel untuk keperluan pelaporan dan analisis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}