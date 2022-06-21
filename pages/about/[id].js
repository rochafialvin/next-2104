import axiosInstance from "../../services/axios";

export default function AboutDetail(props) {
  const { chief } = props;

  if (!chief) return <h1>loading ...</h1>;

  return <div>Detail {chief.name} </div>;
}

export async function getStaticProps(context) {
  try {
    const { id } = context.params;
    const res = await axiosInstance.get(`/chiefs/${id}`);
    return {
      props: { chief: res.data },
    };
  } catch (error) {
    throw error;
  }
}

export async function getStaticPaths() {
  try {
    const res = await axiosInstance.get("chiefs");
    const chiefs = res.data;
    const pathParams = chiefs.map((chief) => {
      return { params: { id: String(chief.id) } };
    });

    return {
      // paths akan menentukan jumlah page yang akan digenerate
      paths: pathParams,
      fallback: true, // false or 'blocking'
    };
  } catch (error) {
    console.log({ error });
  }
}
