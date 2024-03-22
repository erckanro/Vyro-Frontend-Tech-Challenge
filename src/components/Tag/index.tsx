import styles from "./index.module.scss";

export type Props = {
  children: React.ReactNode;
  is_sold?: string;
};


export default function Tag(props: Props) {
  const { children, is_sold } = props;
  const tagStyle = is_sold == "green" ? styles.green : styles.red

  return <span className={`${styles.tag} ${is_sold ? tagStyle : ""}`}>{children}</span>;
}
