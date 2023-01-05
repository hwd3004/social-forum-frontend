interface Data<T> {
  data: T;
  error: object | string;
  loading: boolean;
}

export default Data;
