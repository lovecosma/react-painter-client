
export default function SampleSelectionMenu(p5, sel, sel_2, sel_3, sel_4) {
    sel.style("display", "block")
    sel_2 = p5.createSelect();
    sel_2.style("display", "block")
    sel_3 = p5.createSelect();
    sel_3.style("display", "block")
    sel_4 = p5.createSelect();
    sel_4.style("display", "block")
    for (let i = 0; i < Object.entries(buffers).length; i++) {
        sel.option(buffers[i].name)
        sel_2.option(buffers[i].name)
        sel_3.option(buffers[i].name)
        sel_4.option(buffers[i].name)
    }
}
