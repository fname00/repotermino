"use client";
import Select from "react-select";

const PropertyDescription = () => {
  const opcjeKategorii = [
    { value: "Apartments", label: "Apartamenty" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Domy" },
    { value: "Loft", label: "Loft" },
    { value: "Office", label: "Biuro" },
    { value: "Townhome", label: "Dom w zabudowie szeregowej" },
    { value: "Villa", label: "Willa" },
  ];
  const opcjeLista = [
    { value: "All Listing", label: "Wszystkie ogłoszenia" },
    { value: "Active", label: "Aktywne" },
    { value: "Sold", label: "Sprzedane" },
    { value: "Processing", label: "W realizacji" },
  ];
  const opcjeStatusuNieruchomosci = [
    { value: "All Cities", label: "Wszystkie miasta" },
    { value: "Pending", label: "Oczekujące" },
    { value: "Processing", label: "W realizacji" },
    { value: "Published", label: "Opublikowane" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Tytuł</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz tytuł"
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Opis</label>
            <textarea
              cols={30}
              rows={5}
              placeholder="Opis nieruchomości"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Wybór kategorii
            </label>
            <div className="location-area">
              <Select
                defaultValue={[opcjeKategorii[1]]}
                name="colors"
                options={opcjeKategorii}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Lista</label>
            <div className="location-area">
              <Select
                defaultValue={[opcjeLista[1]]}
                name="colors"
                options={opcjeLista}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Status nieruchomości
            </label>
            <div className="location-area">
              <Select
                defaultValue={[opcjeStatusuNieruchomosci[1]]}
                name="colors"
                options={opcjeStatusuNieruchomosci}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Cena w $
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz cenę"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Roczna stawka podatkowa
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz stawkę podatkową"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Etykieta po cenie
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz etykietę"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PropertyDescription;
