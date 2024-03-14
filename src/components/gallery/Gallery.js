import React from 'react'
import Layout from '../common/Layout'
import Carousel from '../common/Carousel'

const Gallery = () => {
  return (
    <Layout>
       <div className="min-h-screen flex flex-col">
      {/* Section 1 */}
      <section className="flex flex-col items-center justify-center h-screen mb-10">
      <Carousel />
      </section>

      {/* Section 2 */}
      <section className="flex flex-col items-center justify-center h-screen  mb-10">
        <Carousel />
      </section>

      {/* Section 3 */}
      <section className="flex flex-col items-center justify-center h-screen ">
      <Carousel />
      </section>
    </div>
    </Layout>
  )
}

export default Gallery