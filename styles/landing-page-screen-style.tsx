import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#DC143C",
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    overflow: "hidden",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
    marginTop: -20,
    paddingHorizontal: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Para Android
  },
  bookmarksContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  bookmarkTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  floatingButton: {
    backgroundColor: "#23EBC3",
    position: "absolute",
    bottom: 30,
    right: 20,
    padding: 15,
    borderRadius: 30,
  },
  floatingButtonText: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  coinItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  coinPrice: {
    fontSize: 16,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  favoritesContainer: {
    marginBottom: 20,
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DC143C",
    marginBottom: 10,
    marginVertical: 20,
    marginLeft: 20,
  },
  noFavoritesText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 20,
  },
  favoriteButton: {
    fontSize: 20,
    color: "#FFD700",
    paddingHorizontal: 10,
  },
});
