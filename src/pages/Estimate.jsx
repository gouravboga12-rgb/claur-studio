import EstimateContent from '../components/EstimateContent'
import SEO from '../components/SEO'

const Estimate = () => {
  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-white">
      <SEO 
        title="Get Design Estimate | Cost Calculator"
        description="Estimate your interior design cost in Hyderabad. Use our dynamic calculator for modular kitchen, full home, or villa design estimates from Claur Studio."
        keywords="Interior Design Cost Hyderabad, 2BHK Interior Design Cost, Modular Kitchen Estimate Hyderabad, House Interior Work Calculator, Claur Studio Estimate"
      />
      <div className="bg-[#FAF7F2]">
        <EstimateContent />
      </div>
    </div>
  )
}

export default Estimate
