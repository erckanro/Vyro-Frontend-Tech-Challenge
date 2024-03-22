import Tag from "../Tag";
import styles from "./index.module.scss";

type Media = {
  src: string;
  alt: string;
  placement: "featured" | "gallery";
};

type Props = {
  media: Array<Media>;
  name: string;
  code: string;
  condition: "new" | "used" | "demo";
  is_sold: boolean;
};

export default function Vehicle(props: Props) {
  const { media, name, condition, is_sold } = props;

  const conditionMap: Record<string, string> = {
    new: "New",
    used: "Second hand",
    demo: "Dealer demo",
  };

  const formattedCondition = conditionMap[condition] || condition;
  const featuredMediaItem = media.find((item) => item.placement === 'featured');
  const featuredMediaSrc = featuredMediaItem ? featuredMediaItem.src : "https://via.placeholder.com/1000x600";

  return (
    <div className={styles.vehicle}>
      <img className={styles.media} src={featuredMediaSrc} alt={featuredMediaItem?.alt || "[alt]"} />
      <h2 className={styles.name}>{name}</h2>
      <Tag>{formattedCondition}</Tag>
      <Tag is_sold={is_sold ? "red" : "green"}>{is_sold ? "Sold" : "Available now"}</Tag>
    </div>
  );
}
