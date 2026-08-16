import "./SearchBar.css";
import vector from "../../assets/images/search.svg";

export const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="material-symbols">
        <img className="vector" alt="Vector" src={vector} />
      </div>
      <div className="text-wrapper">검색</div>
    </div>
  );
};
