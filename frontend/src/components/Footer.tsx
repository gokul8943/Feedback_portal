
export function Footer() {
  return (
    <footer className="bg-gray-100 py-6 px-6 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">© {new Date().getFullYear()} Feedback Portal. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">Terms</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}