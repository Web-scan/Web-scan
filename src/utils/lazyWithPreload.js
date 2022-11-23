import { lazy } from "react";

export default function lazyWithPreload(importFunction) {
  const Component = lazy(importFunction);
  Component.preload = importFunction;
  return Component;
}
