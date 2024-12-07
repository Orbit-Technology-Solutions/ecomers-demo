import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import TrendingProducts from '@/components/home/TrendingProducts';
import NewArrivals from '@/components/home/NewArrivals';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <TrendingProducts />
      <NewArrivals />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
