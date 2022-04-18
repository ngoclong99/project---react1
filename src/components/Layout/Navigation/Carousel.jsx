import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

Carousel.propTypes = {
  timeOut: PropTypes.string
}

const listImg = [
  {
    title: (
      <>
        <span>E</span>-SHOPPER
      </>
    ),
    name: 'Free E-Commerce Template',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: 'girl1.jpg',
    pricing: 'pricing.png'
  },
  {
    title: (
      <>
        <span>E</span>-SHOPPER
      </>
    ),
    name: '100% Responsive Design',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: 'girl2.jpg',
    pricing: 'pricing.png'
  },
  {
    title: (
      <>
        <span>E</span>-SHOPPER
      </>
    ),
    name: 'Free Ecommerce Template',
    content:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua',
    img: 'girl3.jpg',
    pricing: 'pricing.png'
  }
]

function Carousel(props) {
  const { timeOut } = props
  const [itemMaint, setItemMaint] = useState(null)
  const [listItem, setlistLtem] = useState(null)
  const widthItem = listItem?.[0]?.offsetWidth
  const lengthImgs = listItem?.length
  const position = useRef(0)
  const index = useRef(0)
  const click = useRef(false)
  const [dot, setDot] = useState(0)

  useEffect(() => {
    setItemMaint(document.querySelector('.carousel-home'))
    setlistLtem(document.querySelectorAll('.item'))
  }, [])

  function handleNextImg() {
    if (click.current === false) handleChangeSlide(1)
  }
  function handlePreImg() {
    if (click.current === false) handleChangeSlide(-1)
  }
  function handleDot(i) {
    if (click.current === false) {
      position.current = i * -widthItem
      index.current = i
      handleChangeSlide(0)
    }
  }
  function handleChangeSlide(action) {
    let delay = Number(timeOut) + 300
    click.current = true
    if (action === 1) {
      if (index.current >= lengthImgs - 1) {
        position.current = 0
        index.current = 0
      } else {
        position.current = position.current - widthItem
        index.current++
      }
    } else if (action === -1) {
      if (index.current <= 0) {
        position.current = (lengthImgs - 1) * -widthItem
        index.current = lengthImgs - 1
      } else {
        position.current = position.current + widthItem
        index.current--
      }
    }
    itemMaint.style.transform = `translateX(${position.current}px)`
    setDot(index.current)
    setTimeout(() => {
      click.current = false
    }, delay)
  }

  function renderCarousel() {
    return listImg.map((i) => (
      <div className="item" key={i.name}>
        <div className="col-sm-6">
          <h1>{i.title}</h1>
          <h2>{i.name}</h2>
          <p>{i.content}</p>
          <button type="button" className="btn btn-default get">
            Get it now
          </button>
        </div>
        <div className="col-sm-6">
          <img src={require(`../../../asset/images/home/${i.img}`)} className="girl img-responsive" alt="" />
          <img src={require(`../../../asset/images/home/${i.pricing}`)} className="pricing" alt="" />
        </div>
      </div>
    ))
  }

  function renderDots() {
    return Array.from(Array(lengthImgs).keys()).map((i) => (
      <li className={i === dot ? 'active' : ''} onClick={() => handleDot(i)} key={i}></li>
    ))
  }

  return (
    <section id="slider">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div id="slider-carousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">{renderDots()}</ol>
              <div className="wrap-carousel">
                <div
                  className="carousel-inner carousel-home"
                  style={{
                    transition: `all ${timeOut}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.68,-0.55,0.27,1.55)'
                  }}
                >
                  {renderCarousel()}
                </div>
              </div>
              <span className="left control-carousel hidden-xs" onClick={handlePreImg}>
                <i className="fa fa-angle-left cuso"></i>
              </span>
              <span className="right control-carousel hidden-xs cuso" onClick={handleNextImg}>
                <i className="fa fa-angle-right"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Carousel
