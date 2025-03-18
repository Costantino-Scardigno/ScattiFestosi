import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Image, Heart, MessageSquare } from "lucide-react";

const SharedAlbumView = () => {
  const { shareCode } = useParams();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchSharedAlbum();
  }, [shareCode]);

  const fetchSharedAlbum = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Verifica se l'utente è autenticato e in caso affermativo, include il token
      const token = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
      };

      // Aggiungi il token di autorizzazione se presente
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(
        `http://localhost:8080/api/events/share/${shareCode}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Album non trovato");
        }
        throw new Error("Errore nel recupero dell'album");
      }

      const data = await response.json();
      setAlbum(data);
    } catch (error) {
      console.error("Errore:", error);
      setError(error.message || "Si è verificato un errore");
    } finally {
      setIsLoading(false);
    }
  };

  // Gestione visualizzazione foto
  const openPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-secondary-custom" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
        <p className="mt-3 text-primary-custom">
          Caricamento album condiviso...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 ">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 bg-light-custom">
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  <Image size={64} className="text-secondary-custom" />
                </div>
                <h2 className="mb-3 text-primary-custom">
                  Oops! Qualcosa è andato storto
                </h2>
                <p className="text-muted-custom mb-4">{error}</p>
                <Link to="/" className="btn btn-secondary-custom">
                  Torna alla home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="container py-5 text-center ">
        <div className="alert alert-warning">
          Album non trovato o link non valido.
        </div>
        <Link to="/" className="btn btn-secondary-custom mt-3">
          Torna alla home
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 bg-light-custom vh-100">
      <div className="row mb-4">
        <div className="col">
          <Link to="/" className="text-decoration-none text-primary-custom">
            <div className="d-flex align-items-center">
              <ArrowLeft size={20} className="me-2" />
              <span>Torna alla home</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <h1 className="display-4">{album.name}</h1>
          {album.description && (
            <p className="lead text-primary-custom">{album.description}</p>
          )}
          <div className="d-flex align-items-center text-muted-custom small">
            <span>{album.photoCount || album.photos.length} foto</span>
            <span className="mx-2">•</span>
            <span>Condiviso pubblicamente</span>
          </div>
        </div>
      </div>

      {album.photos && album.photos.length > 0 ? (
        <div className="row g-3">
          {album.photos.map((photo) => (
            <div
              className="col-6 col-md-4 col-lg-3"
              key={photo.id}
              onClick={() => openPhoto(photo)}
            >
              <div className="card h-100 border-custom shadow-sm hover-zoom">
                <div
                  className="card-img-container"
                  style={{ height: "200px", overflow: "hidden" }}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || "Album photo"}
                    className="card-img-top h-100 w-100 object-fit-cover"
                  />
                </div>
                <div className="card-footer bg-white-custom border-top border-custom py-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center me-3">
                        <Heart size={14} className="text-danger me-1" />
                        <span>{photo.likeCount || 0}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <MessageSquare
                          size={14}
                          className="text-secondary-custom me-1"
                        />
                        <span>{photo.commentCount || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div
            className="rounded-circle bg-secondary-light d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: "64px", height: "64px" }}
          >
            <Image size={32} className="text-primary-custom" />
          </div>
          <h3 className="h5 text-primary-custom">
            Nessuna foto in questo album
          </h3>
          <p className="text-muted-custom">
            Questo album non contiene ancora foto.
          </p>
        </div>
      )}

      {/* Modale per visualizzare la foto selezionata */}
      {selectedPhoto && (
        <div
          className="modal fade show d-block position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dashboard "
          onClick={closePhoto}
        >
          <button
            type="button"
            className="btn-close btn-close position-absolute top-0 end-0 m-4"
            onClick={closePhoto}
            aria-label="Close"
          ></button>
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 bg-transparent">
              <div className="modal-body p-0 text-center">
                <img
                  src={selectedPhoto.url}
                  className="img-fluid rounded mx-auto d-block"
                  alt={selectedPhoto.caption || "Photo view"}
                  style={{ maxHeight: "80vh" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedAlbumView;
