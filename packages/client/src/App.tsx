import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/ui/Footer';
import ChatGateway from './components/ui/ChatGateway';
import NavBar from './components/ui/NavBar';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import Collection from './components/pages/Collection';
import Contact from './components/pages/Contact';

function App() {
   return (
      <Router>
         <div className="flex min-h-screen flex-col bg-white">
            <NavBar />
            <main className="flex-1 pt-16">
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Products" element={<Products />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/contact" element={<Contact />} />
               </Routes>
               <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:shadow-xl">
                     <ChatGateway />
                  </div>
               </section>
            </main>
            <Footer />
         </div>
      </Router>
   );
}

export default App;
