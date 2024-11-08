import Dropdown from '@/components/common/Dropdown';

const CategoryDropdown = ({ categories, selectedCategoryId, onSelectCategory }) => {
  const formattedCategories = categories?.map(category => ({
    Id: category.Id,
    Title: category.Tree === 'doc' ? `  ${category.Title}` : category.Title,
    Tree: category.Tree
  })) || [];

  return (
    <Dropdown
      items={formattedCategories}
      selectedId={selectedCategoryId}
      onSelect={onSelectCategory}
      placeholder="카테고리 선택"
      isTree={true}
      customStyles={{
        container: 'w-full relative',
        menu: 'z-[60] absolute top-full left-0 w-full max-h-[300px] overflow-y-auto'
      }}
    />
  );
};

export default CategoryDropdown;
