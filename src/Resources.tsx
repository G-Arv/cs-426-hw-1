// import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'

function Resources() {
    const location = useLocation()
    const navigate = useNavigate()
    const user = location.state;

    return (
        <>
        <Menu page={["results", "profile", JSON.stringify(user)]}/>
        <h1>Hi {user.userName}! You've reached the Resources Page.
        </h1>
        <h3>
            Read our short articles on ways you can reduce your environmental footprint,
            head back to your results page, or log out of the application. 
        </h3>
        <div className="resourceCard">
            <h2>Ways to Reduce Your Environmental Footprint</h2>
            <p className="resourceParagraph">
                According to the University of Michigan, there are a number of ways you can reduce
                your overall environmental footprint! This includes the following: 

                <ul>
                    <li>Reduce meat in your diet and avoid wasting food after meals</li>
                    <li>Use a different mode of tranpsortation that is more eco-friendly, such as walking,
                  biking, or public tranpsortation</li>
                    <li> Ensure that you regularly maintain your vehicle and tires are properly inflated to 
                  maintain fuel efficiency</li>
                    <li>Reduce and reuse items to minimize your personal waste</li>
                    <li>Before buying a product, consider if you need it, if you can get it used, and 
                  how long it will last</li>
                    <li>Purchase items with a comparatively low carbon footprint, which manufacturers sometimes
                  publish</li>
                </ul>

                Check out this link for more information: <a href="https://css.umich.edu/publications/factsheets/sustainability-indicators/carbon-footprint-factsheet">Carbon Footprint Factsheet</a>
            </p>
        </div>

        <div className="resourceCard">
            <h2>Book Recommendations</h2>
            <p className="resourceParagraph">
                If you would like to read books on sustainability, check out the following!

                <ul>
                    <li>Balancing Green by Yossi Sheffi
                        <ul>
                            <li>If you would like to learn more about the history of sustainable practices in the supply chain 
                  industry and how manufacturers are actively improving their carbon footprint, this book is for you!
                  Sheffi covers these topics in-depth and covers multiple solutions to carbon emissions
                  in detail. </li>
                        </ul>
                    </li>
                    <li>Zero Waste Home by Bea Johnson 
                        <ul>
                            <li>If you would like to learn more about sustainable living at home and leading a zero-waste lifestyle,
                  check out this book! Johnson covers her family's journey towards zero waste living and 
                  shares multiple tips for achieving this goal.</li>
                        </ul>
                    </li>
                    <li>The Carbon Footprint of Everything by Mike Berners-Lee 
                        <ul>
                            <li>If you'd like to learn more about carbon footprints and the carbon footprints of popular
                  products, this book is for you! Berners-Lee covers the carbon footprints of items such as bananas
                  and how much of an impact these items have on the environment.</li>
                        </ul>
                    </li>
                </ul>
            </p>
        </div>

        <div className="resourceCard">
            <h2>Documentary Recommendations</h2>
            <p className="resourceParagraph">
                If you would like to watch documentaries on sustainability, check out the following!

                <ul>
                    <li>Planned Obsolescence (2010) 
                            <ul>
                                <li>This documentary covers the overall design of products and how some companies are designining products
                  to fail. If you would like to learn more about product design, the circular economy, overconsumption,
                  waste, and greenwashing, this documentary is for you! It can be accessed with this
                  link: <a href="https://www.youtube.com/watch?v=wzJI8gfpu5Y">Planned Obsolescence</a>.</li>
                            </ul>
                    </li>
                    <li>David Attenborough: A Life on Our Planet (2020)
                        <ul>
                            <li>This documentary covers the life of Sir David Attenborough, a well-known environmentalist. He covers his
                  knowledge of the environment over the course of his life, and brings the urgency of the climate crisis in
                  perspective. If you're interested in climate change and its impacts, this documentary is for you! It can be 
                  accessed on popular streaming sites such as Netflix.</li>
                        </ul>
                    </li>
                </ul>
            </p>
        </div>
        <div className="buttonCard">
            <button onClick={() => navigate("/results")}>Results</button>
            <button onClick={() => navigate("/")}>Log Out</button>
        </div>
        </>
    )
}

export default Resources