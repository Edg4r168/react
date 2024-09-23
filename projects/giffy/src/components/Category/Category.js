import { CategoryTitle, CategoryLink, CategoryList, CategoryListItem } from "./styles"

export const Category = ({ title, options } = { options: [] }) => {
    return <section>
        <CategoryTitle>{title}</CategoryTitle>
        <CategoryList>
            {
                options.map((category, index) => (
                    <CategoryListItem key={category} index={index}>
                        <CategoryLink to={`/search/${category}`}>Gifs de {category}</CategoryLink>
                    </CategoryListItem>
                ))
            }
        </CategoryList>
    </section>
}