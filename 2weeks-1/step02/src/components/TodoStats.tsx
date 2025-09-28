interface Props {
  total: number;
  done: number;
}

export default function TodoStats({ total, done }: Props) {
  const remaining = total - done;
  return (
    <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
      남은 할 일: <b>{remaining}</b>개 / 전체 <b>{total}</b>개
    </div>
  );
}
