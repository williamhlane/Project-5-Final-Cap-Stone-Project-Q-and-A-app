
const Categories = () => {
    const catClick = () => {
        console.log('cat clicked');
    }
    return (
        <div id="categories">
            <h4>Categories</h4>
            <ul>
                <li onClick={catClick}>Cat One</li>
                <li onClick={catClick}>Cat two</li>
                <li onClick={catClick}>Cat three</li>
            </ul>
        </div>
    )
}
export default Categories;