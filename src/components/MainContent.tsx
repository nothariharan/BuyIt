import { useEffect, useState } from "react"
import { useFilter } from "./FilterContent"
import { Tally3 } from 'lucide-react';
import axios from "axios";

const MainContent = () => {
  const {searchQuery, selectedCategory, minPrice, maxPrice, keyword} = useFilter()
  const [products,setProducts] = useState<any[]>([])
  const [filter,setFilter] = useState('all')
  const [currentPage,setCurrentPage] = useState(1)
  const [dropdownOpen, setDropdownopen] = useState(false)
  const itemsPerPage = 12


  useEffect(()=>{
      let url = `https://dummyjson.com/products?limit=${itemperpage}&skip=${(currentPage-1)*itemsPerPage}`
      if (keyword){
        url = `https://dummyjson.com/products/search?q=${keyword}`
      }

      axios.get(url).then(response => {
        setProducts(response.data.products)
      }).catch( error => {
        console.log(error)
      })

  },[currentPage,keyword])

  





  return (
    <section className="xl:w-[55rem] lg:w[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row jusitfy-between items-center">
          <div className="relative mb-5 mt-5">
            <button className="border px-4 py-2 rounded-full flex items-center">
              <Tally3 className="mr-2"/>
              {filter === 'all'? 'Filter' : filter.charAt(0).toLowerCase()+filter.slice(1)}
            </button>
          {dropdownOpen && (
            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button onClick={()=>setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                  Cheap
                </button>
                <button onClick={()=>setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                  Expensive
                </button>
                <button onClick={()=>setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                  Popular
                </button>
      
            </div>
          )}

          </div>
        </div>
          <div className="grid grid-cols-4 sm:grid-cols-3 sm:grid-cols-4 gap-3">
            {/* Card */}
          </div>


      </div>

    </section>
  )
}

export default MainContent