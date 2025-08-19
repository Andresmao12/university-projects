import styles from "./Target.module.css"

const Target = ({ Icon, title, desc }) => {
  return (
    <div className={styles.targetCont}>
      <Icon className={styles.icon}/>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  )
}

export default Target