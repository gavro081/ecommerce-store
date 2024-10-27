import React, { useState } from "react";
import './shop.css'
import { FaBeer } from "react-icons/fa";
import { AiFillEye, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import allProducts from "./home_products";

const Shop = ({ shop, Filter, FilterArr, allcatefilter, addtocart }) => {
    const [showDetail, setShowDetail] = useState(false)
    const [detail, setDetail] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        brand: false,
        size: false
    });
    const [selectedBrand, setSelectedBrand] = useState('');
    const [showSelectBrandButton, setShowSelectBrandButton] = useState(true);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const [filters, setFilters] = useState({
        brand: [],
        size: []
    });

    const [showSelectFilterButton, setShowSelectFilterButton] = useState(true);

    const toggleDropdown = (filterType) => {
        setIsDropdownOpen({
            ...isDropdownOpen,
            [filterType]: !isDropdownOpen[filterType]
        })
    }
   
    const handleFilterSelect = (event, filterType) => {
        const value = (filterType) === "size" ? Number(event.target.value) : event.target.value;
        const updatedFilter = filters[filterType].includes(value) ?
            filters[filterType].filter((item) => item !== value) : [...filters[filterType], value];

        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: updatedFilter
        }));
        FilterArr({
            ...filters,
            [filterType]: updatedFilter
        });
    };

    const handleAll = () => {
        setFilters({
            brand: [],
            size: []
        });
        allcatefilter();
    }

    const brands = ["nike", "adidas", "brooks", "asics"];

    const sizes = Array.from({ length: 48 - 37 + 1 }, (_, i) => 37 + i);

    const navigate = useNavigate();

    const handleProductView = (productID) => {
        navigate(`/view/${productID}`);
    };

    return (
        <div className="main">
            <div className="shop">
                {/* <p> Home / Shop </p> */}
                <div className="container">
                    <div className="left-box">
                            <div className="box">
                                <div className="filters">
                                    <button className="filter-btn" onClick={handleAll}>show all</button>
                                    <button className="filter-btn" onClick={() => toggleDropdown("brand")}>brand</button>
                                    {isDropdownOpen.brand && (
                                        <div className="filter-picker brand">
                                            {brands.map((brand) => (
                                                <div key={brand}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={brand}
                                                            checked={filters.brand.includes(brand)}
                                                            onChange={(e) => handleFilterSelect(e, "brand")}
                                                        />
                                                        <span className="checkbox brand"></span>
                                                        {brand}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button className="filter-btn" onClick={() => toggleDropdown("size")}>size</button>
                                    {isDropdownOpen.size && (
                                        <div className="filter-picker size">
                                            {sizes.map((size) => (
                                                <div key={size}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={size}
                                                            checked={filters.size.includes(size)}
                                                            onChange={(e) => handleFilterSelect(e, "size")}
                                                        />
                                                        <span className="checkbox size">
                                                            <span>{size}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                    </div>
                    <div className="right_box">
                        <div className="products">
                            {
                                shop.map((curElm) => {
                                    return (
                                        <>
                                            <div>
                                                <div className="box" onClick={() => handleProductView(curElm.id)}>
                                                    <div className="img_box">
                                                        <img src={curElm.image} alt="" />
                                                    </div>
                                                    <div className="info">
                                                        <p>{curElm.brand}</p>
                                                        <p>{curElm.name}</p>
                                                        <p>${curElm.price}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop