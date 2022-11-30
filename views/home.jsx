const React = require('react')
const Def = require('./default')

function home () {
    return(
        <Def>
            <main>
                <h1>REST-rant</h1>
                <div>
                    <img src='/images/pizza.jpg' alt='pizza' />
                    <div>
                        Photo by <a href="https://unsplash.com/@alanaktion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alan Hardman</a> on <a href="https://unsplash.com/s/photos/free-pizza?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>  
                    </div>
                </div>
                <a href='/places'>
                    <button className='btn-primary'>Places Page</button>
                </a>
            </main>
        </Def>
    )
}

module.exports = home