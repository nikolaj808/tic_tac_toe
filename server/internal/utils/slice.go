package utils

func RemoveBy[T comparable](slice []T, compare func(T) bool) ([]T, bool) {
	for i, v := range slice {
		if compare(v) {

			return append(slice[:i], slice[i+1:]...), true
		}
	}

	return slice, false
}

func IndexOf[T comparable](slice []T, compare func(T) bool) (int, bool) {
	for i, v := range slice {
		if compare(v) {
			return i, true
		}
	}

	return -1, false
}
