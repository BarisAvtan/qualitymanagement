import { Modal, Spin, Button, Card } from 'antd';
import React, { useState } from 'react';
import { LeftOutlined, RightOutlined, RotateLeftOutlined, RotateRightOutlined, DownloadOutlined } from '@ant-design/icons';

function TaskDetail({ isModalOpen, setIsModalOpen, imageUrls = [], isLoading }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [rotation, setRotation] = useState(0);

  const clearModalAndClose = () => {
    setIsModalOpen(false);
  };

  const rotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const rotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const handleImageClick = (url) => {
    setPreviewImage(url);
    setRotation(0); // Yeni resimde döndürme sıfırlansın
    setPreviewOpen(true);
  };

  // Önceki resme geçiş
  const goPrevious = () => {
    if (!imageUrls || !previewImage) return;
    const currentIndex = imageUrls.findIndex((url) => url === previewImage);
    if (currentIndex > 0) {
      setPreviewImage(imageUrls[currentIndex - 1]);
      setRotation(0);
    }
  };

  // Sonraki resme geçiş
  const goNext = () => {
    if (!imageUrls || !previewImage) return;
    const currentIndex = imageUrls.findIndex((url) => url === previewImage);
    if (currentIndex < imageUrls.length - 1) {
      setPreviewImage(imageUrls[currentIndex + 1]);
      setRotation(0);
    }
  };

  const currentIndex = Array.isArray(imageUrls) && previewImage
  ? imageUrls.findIndex(url => url === previewImage)
  : -1;
  return (
    <>
      {/* Ana Görseller Modalı */}
      <Modal
        width={1500}
        height="50%"
        open={isModalOpen}
        onCancel={clearModalAndClose}
        footer={[
          <Button
            key="cancel"
            onClick={clearModalAndClose}
            style={{
              backgroundColor: '#0A4D80',
              color: '#fff',
              border: 'none',
            }}
          >
            Vazgeç
          </Button>,
        ]}
      >
        <div style={{ width: '97%', marginTop: 30 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
              minHeight: '200px',
            }}
          >
            {isLoading ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '60px 0',
                  backgroundColor: '#fafafa',
                  borderRadius: '8px',
                }}
              >
                <Card
                  style={{
                    padding: '30px 50px',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: '12px',
                    textAlign: 'center',
                  }}
                >
                  <Spin size="large" tip="Görseller yükleniyor..." />
                  <div style={{ marginTop: 24, color: '#555', fontSize: 15 }}>
                    Görseller hazırlanmaya başlandı. Dosya sunucusundan görsellere erişiliyor. Yükleme süresi sunucu yoğunluğuna bağlı olarak değişebilir.
                  </div>
                </Card>
              </div>
            ) : imageUrls && imageUrls.length > 0 ? (
              imageUrls.map((url, index) => (
                <div key={index} style={{ maxWidth: 300 }}>
                  <img
                    src={url}
                    alt={`Görsel ${index + 1}`}
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    onClick={() => handleImageClick(url)}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              ))
            ) : (
              <p>Görseller hazırlanamadı ve sunucuda ilgili montaja ait herhangi bir görsel bulunamadı.</p>
            )}
          </div>
        </div>
      </Modal>

      <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)} centered width="50%">
  {previewImage && (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%', textAlign: 'center' }}>
      
      {/* Önceki Butonu */}
      <Button
        onClick={goPrevious}
        icon={<LeftOutlined />}
        disabled={currentIndex <= 0}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          //transform: 'translate(-50%, -50%)',
          zIndex: 10,
          height: 50,
          width: 50,
          borderRadius: '50%',
        }}
      />

      {/* Resim */}
      <img
        src={previewImage}
        alt="Büyük Önizleme"
        style={{
          maxWidth: '80%',
          maxHeight: '80vh',
          borderRadius: 10,
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.3s ease',
          display: 'block',
          margin: '0 auto',
          transformOrigin: 'center center',
        }}
      />

      {/* Sonraki Butonu */}
      <Button
        onClick={goNext}
        icon={<RightOutlined />}
        disabled={currentIndex === -1 || currentIndex >= imageUrls.length - 1}
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          //transform: 'translate(50%, -50%)',
          zIndex: 10,
          height: 50,
          width: 50,
          borderRadius: '50%',
        }}
      />
    </div>
  )}

  {/* Döndürme ve Kaydet Butonları */}
  {previewImage && (
    <div
      style={{
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <Button onClick={rotateLeft} icon={<RotateLeftOutlined />}>
        Sola Döndür
      </Button>

      <Button onClick={rotateRight} icon={<RotateRightOutlined />}>
        Sağa Döndür
      </Button>

      <a href={previewImage} download target="_blank" rel="noopener noreferrer">
        <Button
          style={{
            backgroundColor: '#0A4D80',
            color: '#fff',
            border: 'none',
          }}
          icon={<DownloadOutlined />}
        >
          Kaydet
        </Button>
      </a>
    </div>
  )}
</Modal>

    </>
  );
}

export default TaskDetail;
