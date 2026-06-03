content = open("src/components/DialogueCard.jsx", encoding="utf-8").read()
fixed = content.replace("d.added_by === currentUse\n", "d.added_by === currentUser\n")
open("src/components/DialogueCard.jsx", "w", encoding="utf-8").write(fixed)
print("Done")
