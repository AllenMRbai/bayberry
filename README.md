# bayberry

a small, simple react state-management library.

```bash
npm install bayberry-store # TODO 待定
```

## 创建 store

```jsx
import { create } from "bayberry-store";

export const countStore = create({
  count: 0,
  user: null,
});

export const add = () => {
  countStore.set({
    count: countStore.get().count + 1,
  });
};

export const fetchUser = async () => {
  const res = await fetch("https://some.api.com/user");
  const user = await res.json();

  countStore.set({
    user,
  });
};
```

## then bind your component

```jsx
import { useEffect } from "react";
import { countStore, add, fetchUser } from "./store";

const Count = () => {
  const { count, user } = countStore.use();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h2>
        {user.name}:{count}
      </h2>
      <button onClick={() => add()}>add</button>
    </div>
  );
};
```
