import { useState } from 'react';

const SearchBar = () => {
   const [search, setSearch] = useState('');

   return (
      <div className="flex justify-center my-8">
         <div className="flex w-full max-w-xl shadow-md rounded-lg overflow-hidden">
            <input
               type="text"
               placeholder="Search products..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full px-4 py-3 outline-none border border-gray-300"
            />

            <button className="bg-blue-600 text-white px-6 hover:bg-blue-700 transition">
               Search
            </button>
         </div>
      </div>
   );
};

export default SearchBar;
