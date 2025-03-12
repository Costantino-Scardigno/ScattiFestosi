import "../components/Section.css";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoMdAlbums } from "react-icons/io";
import { BsQrCode } from "react-icons/bs";
import { MdOutlineAddTask } from "react-icons/md";

function Mysection() {
  return (
    <section id="utilità" className="container-fluid  bg-section mb-5 pt-6  ">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column">
            <h2 className="display-3 text-center my-3 ">
              Perchè è utile ScattiFestosi?
            </h2>
            <div className="d-flex align-items-center  ">
              <img
                className="rounded-5 w-25 mb-4 d-none d-lg-block"
                src="https://images.weduploader.com/v2/assets/images/wedding-image5.jpg"
                alt=""
              />
              <div>
                <div className="d-flex  ">
                  <HiMiniUserGroup size={45} className="responsive-icon  " />
                  <p className="fs-4 pb-4">
                    Gratis per te, gratis per i tuoi ospiti! Crea album
                    illimitati che non scadono mai.
                  </p>
                </div>
                <div className="d-flex ">
                  <IoMdAlbums size={50} className="responsive-icon  " />
                  <p className="fs-4 pb-4">
                    ScattiFestosi consente caricamenti illimitati, in qualità
                    originale, da parte di ospiti illimitati ed è tutto
                    archiviato privatamente in cloud.
                  </p>
                </div>
                <div className="d-flex ">
                  <BsQrCode size={50} className="responsive-icon  " />
                  <p className="fs-4 pb-4">
                    ScattiFestosi consente ai tuoi ospiti di caricare foto e
                    video utilizzando qualsiasi browser web tramite URL o codice
                    QR.
                  </p>
                </div>
                <div className="d-flex ">
                  <MdOutlineAddTask size={45} className="responsive-icon  " />
                  <p className="fs-4 pb-4">
                    Varie sfide divertenti da completare durante il tuo evento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mysection;
