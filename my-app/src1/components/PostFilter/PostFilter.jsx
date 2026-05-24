import React from "react";
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";

const PostFilter = ({ filter, setFilter, sortOptions }) => {
    return (
        <div>
            <MyInput
                onChange={e => setFilter(prev => ({ ...prev, query: e.target.value }))}
                value={filter.query}
                placeholder="Поиск хуйни"
            />
            <MySelect
                value={filter.sort}
                onChange={value =>
                    setFilter(prev => ({ ...prev, sort: value }))
                }
                defaultValue="Сортировка"
                options={sortOptions}
            />
        </div>
    );
}

export default React.memo(PostFilter)