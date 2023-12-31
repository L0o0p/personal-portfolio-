import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {// 副作用依赖于 `status` 状态的值。
    // `useEffect` 会在 `status` 状态的值发生变化时重新执行。
    if (status === 'success') clearFields();
  }, [status])

  // 检查 email 变量是否存在（即不是 null、undefined 或空字符串）。如果 email 存在，它会进一步检查 email 中是否包含 @ 符号。
  // &&是并集（同时满足）
  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      // onValidated 函数似乎是一个回调函数，它被用来处理验证通过的电子邮件地址。
      onValidated({
        // 对象 { EMAIL: email } 被作为参数传递给 onValidated 函数，
        // 其中 EMAIL 是对象的键，而变量 email（用户输入的电子邮件地址）是值。
        EMAIL: email
      })
  }

  const clearFields = () => {
    setEmail('');
  }

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Subscribe to our Newsletter<br></br> & Never miss latest updates</h3>
            {status === 'sending' && <Alert>Sending...</Alert>}
            {status === 'error' && <Alert variant="danger">{message}</Alert>}
            {status === 'success' && <Alert variant="success">{message}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                <button type="submit">Submit</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  )
}
