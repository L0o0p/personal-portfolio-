import { Container, Row, Col } from "react-bootstrap"
import { ArrowRightCircle } from 'react-bootstrap-icons';
import headerImg from "../assets/img/header-img.svg";
import { useState, useEffect } from "react";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
  const period = 2000;

  // 囊括了整个打字动画
  useEffect(() => {
    // setInterval 函数，用于定时执行某个函数或代码块
    // 以指定的周期（以毫秒计）无限次地执行代码，
    // 直到使用 clearInterval 函数取消定时器，或者窗口被关闭。
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    // 假设toRotate数组里有9个数，i =0～9中其中一个数。
    let i = loopNum % toRotate.length;
    // 结合上一条，fullText可以取得当前循环中的完整文本
    let fullText = toRotate[i];
    // 根据是否处于“删除”阶段来确定文本的当前状态。如果 isDeleting 为 true，则删减一个字符；否则，向 text 中添加一个字符。
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    // 将上一条的结果，赋值给setText
    setText(updatedText);

    // isDeleting默认为“否”，当为“true”的时候执行以下
    if (isDeleting) {
      // 把delta变为原来的1/2
      setDelta(prevDelta => prevDelta / 2);
    }
    // 当文本显示全的时候：
    if (!isDeleting && updatedText === fullText) {
      // 进入isDeleting状态
      setIsDeleting(true);
      // 更新变量为-1，prevIndx是形式参数，无须提前定义
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      // 退出isDeleting状态
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>{`Hi! I'm Judy`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}