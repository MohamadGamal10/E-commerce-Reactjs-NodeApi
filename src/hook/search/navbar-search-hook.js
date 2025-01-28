import { useEffect, useState } from "react";
import ViewSearchProductsHook from "../products/view-search-products-hook";
import { useNavigate } from "react-router-dom";

const NavbarSearchHook = () => {
    const [items, pagination, onPress, getProducts] = ViewSearchProductsHook();
    const [searchWord, setSearchWord] = useState("");
    const navigate = useNavigate();


    const onChangeSearch = (event) => {
        localStorage.setItem("searchWord", event.target.value);
        setSearchWord(event.target.value);

        const path = window.location.pathname;

        if (path != "/products") {
            // window.location.href = "/products";
            navigate("/products");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getProducts();
        }, 1000);
    }, [searchWord]);

    return [onChangeSearch, searchWord];
}

export default NavbarSearchHook;