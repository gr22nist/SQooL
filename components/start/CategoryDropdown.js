import Dropdown from '@/components/common/Dropdown';

const CategoryDropdown = ({ categories, selectedCategoryId, onSelectCategory }) => {
  return (
    <Dropdown
      items={categories}
      selectedId={selectedCategoryId}
      onSelect={onSelectCategory}
      placeholder="카테고리 선택"
      isTree={true}
      customStyles={{
        container: 'z-50',
        menu: 'z-40'
      }}
    />
  );
};

export default CategoryDropdown;
